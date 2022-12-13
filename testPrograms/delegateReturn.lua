local function f()
    return 1, 2
end

local function g()
    return f()
end

local a, b = g()
print(a)
print(b)
