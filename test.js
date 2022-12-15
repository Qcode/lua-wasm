import * as fs from "fs";

const pages = 1;
const memory = new WebAssembly.Memory({ initial: pages });

let heapStart;
let dataSegmentEnd;
let stackSizeBytes;
let heapSizeBytes;
let halfHeap;

let FP;
let HP;
let SP;

let output = "";

let newHeapPointer;

const framePrologueSize = 12;
const varSize = 8;

const pointerIntervals = [
  { start: -1, size: 1, mapsTo: -1 },
  { start: 0, size: dataSegmentEnd, mapsTo: 0 },
];

const findInIntervals = (ptr) => {
  for (let x = 0; x < pointerIntervals.length; x++) {
    const interval = pointerIntervals[x];
    if (ptr >= interval.start && ptr < interval.start + interval.size) {
      return ptr - interval.start + interval.mapsTo;
    }
  }
  return -1;
};

const copyVar = (dataview, fromLocation, toLocation) => {
  const type = dataview.getInt32(fromLocation, true);
  dataview.setInt32(toLocation, type, true);

  if (type === 0 || type === 1 || type === 2 || type === 3) {
    dataview.setInt32(
      toLocation + 4,
      dataview.getInt32(fromLocation + 4, true),
      true
    );
  } else if (type === 4) {
    const oldStrPtr = dataview.getInt32(fromLocation + 4, true);
    let relocated = findInIntervals(oldStrPtr);
    if (relocated === -1) {
      const strChars = dataview.getInt32(oldStrPtr, true);
      relocated = newHeapPointer;

      const strBytes = 4 + strChars + (4 - (strChars % 4));
      newHeapPointer += strBytes;
      for (let x = relocated; x < relocated + strBytes; x += 4) {
        dataview.setInt32(
          x,
          dataview.getInt32(oldStrPtr + x - relocated, true),
          true
        );
      }
      pointerIntervals.push({
        start: oldStrPtr,
        size: strBytes,
        mapsTo: relocated,
      });
    }
    dataview.setInt32(toLocation + 4, relocated, true);
  } else if (type === 5) {
    const oldClosurePtr = dataview.getInt32(fromLocation + 4, true);
    let relocated = findInIntervals(oldClosurePtr);
    if (relocated === -1) {
      const closureSize = 8;
      relocated = newHeapPointer;
      newHeapPointer += closureSize;

      dataview.setInt32(
        relocated,
        dataview.getInt32(oldClosurePtr, true),
        true
      );
      const staticLink = dataview.getInt32(oldClosurePtr + 4, true);
      if (findInIntervals(staticLink) === -1) {
        copyFrame(dataview, staticLink, false);
      }
      dataview.setInt32(relocated + 4, findInIntervals(staticLink), true);
    }
    dataview.setInt32(toLocation + 4, relocated, true);
  } else if (type === 6) {
    const oldTablePtr = dataview.getInt32(fromLocation + 4, true);
    let relocated = findInIntervals(oldTablePtr);
    if (relocated === -1) {
      const heapArrayElements = dataview.getInt32(oldTablePtr, true);
      const heapArrayCapacity = dataview.getInt32(oldTablePtr + 4, true);
      const heapArrayLocation = dataview.getInt32(oldTablePtr + 8, true);

      const totalBytes = 12 + heapArrayCapacity * 16;

      relocated = newHeapPointer;

      newHeapPointer += totalBytes;

      pointerIntervals.push({
        start: oldTablePtr,
        size: 12,
        mapsTo: relocated,
      });

      pointerIntervals.push({
        start: heapArrayLocation,
        size: heapArrayCapacity * 16,
        mapsTo: relocated + 12,
      });

      dataview.setInt32(relocated, heapArrayElements, true);
      dataview.setInt32(relocated + 4, heapArrayCapacity, true);
      dataview.setInt32(relocated + 8, relocated + 12, true);

      for (let x = 0; x < heapArrayCapacity; x++) {
        // Copy key
        copyVar(dataview, heapArrayLocation + x * 16, relocated + 12 + x * 16);
        // Copy value
        copyVar(
          dataview,
          heapArrayLocation + x * 16 + 8,
          relocated + 12 + x * 16 + 8
        );
      }
    }
    dataview.setInt32(toLocation + 4, relocated, true);
  } else if (type === 7) {
    const oldReturnArrayPtr = dataview.getInt32(fromLocation + 4, true);
    let relocated = findInIntervals(oldTablePtr);
    if (relocated === -1) {
      const numVars = dataview.getInt32(oldReturnArrayPtr, true);
      relocated = newHeapPointer;

      const returnArraySize = 4 + numVars * 8;

      newHeapPointer += returnArraySize;

      pointerIntervals.push({
        start: oldReturnArrayPtr,
        size: returnArraySize,
        mapsTo: relocated,
      });

      dataview.setInt32(relocated, numVars, true);

      for (let x = relocated + 4; x < relocated + returnArraySize; x += 8) {
        copyVar(dataview, oldReturnArrayPtr + relocated - x, x);
      }
    }
    dataview.setInt32(toLocation + 4, relocated, true);
  } else if (type === 8) {
    // This is on the stack, so should be figured out by now
    dataview.setInt32(
      toLocation + 4,
      findInIntervals(dataview.getInt32(fromLocation + 4, true)),
      true
    );
  }
};

const copyFrame = (dataview, frameLocation, recursively) => {
  if (frameLocation == -1) {
    return;
  }

  if (recursively)
    copyFrame(dataview, dataview.getInt32(frameLocation, true), true);

  const frameVariableCount = dataview.getInt32(frameLocation + 8, true);
  const frameSizeBytes = framePrologueSize + varSize * frameVariableCount;

  pointerIntervals.push({
    start: frameLocation,
    size: frameSizeBytes,
    mapsTo: newHeapPointer,
  });

  const newFrameBase = newHeapPointer;

  newHeapPointer += frameSizeBytes;

  const oldDL = dataview.getInt32(frameLocation, true);
  // We only need to follow the dynamic link if it's in our current call stack
  dataview.setInt32(newFrameBase, findInIntervals(oldDL), true);
  // Always need to follow the dynamic link (which may be a function no longer in our call stack)
  const oldSL = dataview.getInt32(frameLocation + 4, true);
  if (oldSL !== -1 && findInIntervals(oldSL) === -1) {
    copyFrame(dataview, oldSL, false);
  }

  dataview.setInt32(newFrameBase + 4, findInIntervals(oldSL), true);

  dataview.setInt32(
    newFrameBase + 8,
    dataview.getInt32(frameLocation + 8, true),
    true
  );

  for (
    let offset = 12;
    offset < 12 + frameVariableCount * varSize;
    offset += 8
  ) {
    copyVar(dataview, frameLocation + offset, newFrameBase + offset);
  }
};

const swapHalves = () => {
  const dataview = new DataView(memory.buffer);

  heapStart =
    heapStart == dataSegmentEnd ? dataSegmentEnd + halfHeap : dataSegmentEnd;

  const frameLocation = FP.value;
  newHeapPointer = heapStart;

  copyFrame(dataview, frameLocation, true);

  for (let x = SP.value + 8; x < pages * 65536; x += 8) {
    // May adjust pointers
    copyVar(dataview, x, x);
  }

  HP.value = newHeapPointer;
  FP.value = findInIntervals(FP.value);
};

const wasmImports = {
  imports: {
    print: (location) => {
      const append = (content) => {
        output += content + "\n";
      };

      const dataview = new DataView(memory.buffer);

      // They give us location = stack pointer
      const type = dataview.getInt32(location, true);
      switch (type) {
        case 0:
          append("nil");
          break;
        case 1:
          append(dataview.getInt32(location + 4, true));
          break;

        case 3:
          const val = dataview.getInt32(location + 4, true);
          append(val === 0 ? "false" : "true");
          break;

        case 4:
          const stringLocation = dataview.getInt32(location + 4, true);
          const size = dataview.getInt32(stringLocation, true);
          const bytes = new Uint8Array(memory.buffer, stringLocation + 4, size);
          const string = new TextDecoder("utf8").decode(bytes);
          append(string);
          break;
        default:
          append(`Attempt to read bad memory type: ${type}`);
      }
    },
    gc: (bytes) => {
      if (HP.value + bytes > heapStart + halfHeap) {
        pointerIntervals.splice(2, pointerIntervals.length - 2);
        swapHalves();
      }
    },
  },
  js: { mem: memory },
};

const wasmFile = fs.readFileSync(process.argv[2]);

WebAssembly.instantiate(new Uint8Array(wasmFile), wasmImports).then((obj) => {
  FP = obj.instance.exports.FP;
  HP = obj.instance.exports.HP;
  SP = obj.instance.exports.SP;

  dataSegmentEnd = FP.value;

  heapStart = dataSegmentEnd;

  const memoryInBytes = pages * 65536 - dataSegmentEnd;

  // Let the stack use 1/10th of the memory
  // Heap 9/10ths
  stackSizeBytes =
    Math.floor(memoryInBytes / 10) - (Math.floor(memoryInBytes / 10) % 8);

  heapSizeBytes =
    Math.floor(memoryInBytes * 0.9) - (Math.floor(memoryInBytes * 0.9) % 8);

  halfHeap = heapSizeBytes / 2;

  obj.instance.exports.main();
  console.log(output.slice(0, -1));
});
