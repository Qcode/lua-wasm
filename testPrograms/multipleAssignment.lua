local x, y = 1, 2

print(x)
print(y)

x, y = y, x
print("x is")
print(x)
print("y is")
print(y)

local function f()
	return 100, 101
end

local a, b, c, d
print("Test 1 -----")
print(a)
print(b)
print(c)
print(d)

a, b, c, d = f()
print("Test 2 ------")
print(a)
print(b)
print(c)
print(d)

a, d, b, c = 1, f()
print("Test 3 ------")
print(a)
print(d)
print(b)
print(c)

d, c, b, a = 1, 2, f()
print("Test 4 ------")
print(d)
print(c)
print(b)
print(a)

b, a, c, d = 1, 2, 3, f()
print("Test 5 ------")
print(b)
print(a)
print(c)
print(d)

d, a, b, c = 1, 2, 3, 4, f()
print("Test 6 ------")
print(d)
print(a)
print(b)
print(c)
