(module
  (func $printString (import "imports" "printString") (param i32) (param i32))
  (func $i (import "imports" "imported_func") (param i32))
  (import "js" "mem" (memory 1))
  (data (i32.const 0) "Hi")
  (data (i32.const 2) "Ab")
  (func (export "exported_func")
    i32.const 0
    i32.const 4  ;; pass length 2 to log
    call $printString
    memory.size
    call $i
  )
)
