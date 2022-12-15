-- Same as before, with local variables

local function f()
	return 100, 101
end

local a, b, c, d
print("Test 1 -----")
print(a)
print(b)
print(c)
print(d)

local a, b, c, d = f()
print("Test 2 ------")
print(a)
print(b)
print(c)
print(d)

local a, b, c, d = 1, f()
print("Test 3 ------")
print(a)
print(b)
print(c)
print(d)

local a, b, c, d = 1, 2, f()
print("Test 4 ------")
print(a)
print(b)
print(c)
print(d)

local a, b, c, d = 1, 2, 3, f()
print("Test 5 ------")
print(a)
print(b)
print(c)
print(d)

local a, b, c, d = 1, 2, 3, 4, f()
print("Test 6 ------")
print(a)
print(b)
print(c)
print(d)
