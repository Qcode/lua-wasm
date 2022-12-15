-- Examples of forwarding arguments from one function to another
-- Should be replaced with nils if not enough, or discarded if too many are passed

local function f0()
end

local function f1()
    return 1
end

local function f2()
    return 1, 2
end

local function f3()
    return 1, 2, 3
end

local function g(x, y)
    print(x)
    print(y)
end

g(f0())
g(f1())
g(f2())
g(f3())
