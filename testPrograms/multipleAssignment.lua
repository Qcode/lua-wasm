local x, y = 1, 2

print(x)
print(y)

x, y = y, x
print("x is")
print(x)
print("y is")
print(y)

x, y = f(), 1

function f()
    return 1, 2
end

function g()
