local x, y = 1, 2

print(x)
print(y)

x, y = y, x
print("x is")
print(x)
print("y is")
print(y)

letters = {"a", "b", "c"}

for index, value in pairs(letters) do
end

if (f()) then
end

function f()
    return true, "because i said so"
end

x, y, z = 1, f()

function f()
    return 1, 2
end

function g()
