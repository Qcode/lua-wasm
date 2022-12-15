-- Any types can be compared in lua, so we ant to make sure all the comparisons work correctly

print(true == true)
print(true == false)
print(false == true)
print(false == false)

local x = 1
print(x == 1)
print(x ~= 1)

local y = 5

print(x + y == 6)
print(x + y ~= -100)
print(true ~= "hello")

local z
print(z == 1)
print(z ~= 1)
print(z == nil)
print(nil == nil)
print(nil == 0)
print(nil ~= 0)

print(false == "")
print(false ~= "")
print(false == "")
