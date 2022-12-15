-- Here we can see an example of return delegation
-- Because f() returns multiple values, and the f() call is at the end of g()
-- g() flattens out the return list from f

local function f()
    return 2, 3
end

local function g()
    return 1, f()
end

local a, b, c, d = g()
print(a)
print(b)
print(c)
print(d)
