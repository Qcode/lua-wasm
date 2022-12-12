local function f()
    return 1
end

local function g()
    return f()
end

local result = g()
print(result)
