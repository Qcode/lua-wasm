-- This is an example of variable shadowing
-- We can see from this example that scopes are well separated

local a = 1
local b = 2

local function g()
    print("in g, outer a and b")
    -- These refer to the outer a, since we haven't yet declared a and b
    print(a)
    print(b)
    local a = 300
    local b = 400
    -- Now, we're talking about local a and b's in g's stack frame
    print("inner a and b")
    print(a)
    print(b)
end

local function f()
    print("f, outer a and b")
    print(a)
    print(b)
    local a = 100
    local b = 200
    g()
    print("back to f, inner a and b")
    print(a)
    print(b)
end

f()
print("back to outside scope")
print(a)
print(b)
