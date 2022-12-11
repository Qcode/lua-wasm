import * as fs from "fs";

const memory = new WebAssembly.Memory({ initial: 1 });

const wasmImports = {
  imports: {
    print: (location) => {
      const append = console.log;

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
      }
    },
  },
  js: { mem: memory },
};

const wasmFile = fs.readFileSync(process.argv[2]);

WebAssembly.instantiate(new Uint8Array(wasmFile), wasmImports).then((obj) =>
  obj.instance.exports.main()
);
