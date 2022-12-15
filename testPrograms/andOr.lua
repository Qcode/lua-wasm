-- In lua, the and operator returns the first argument if false/nil, the second argument if true
-- or returns the first argument if it's truthy, otherwise the second argument
-- We can also see short circuit evaluation here

local function f()
    print("F ran!")
end

-- f doesn't print in either of these cases
print(false and f())
print(true or f())

print(false and "Hello")
print(true and "World")
print(false or "Test")
print(true or "Ing")
print(nil or "This should print")
print(nil and "This shouldn't print")

-- The only falsey values are nil/false, everything else is truthy
print(0 and "0 is true")
print(1 and "1 is also true")
print(0 or "0 is true, so this doesn't print")
print(1 or "1 is true so this doesn't print")
print("" and "the empty string is true, so this prints")

-- And/or is used to construct ternary statements in Lua
shouldBe1 = true and 1 or 2
shouldBe2 = false and 1 or 2
print(shouldBe1)
print(shouldBe2)
