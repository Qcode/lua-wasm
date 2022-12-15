-- Testing variable shadowing

local a = 100

local function f()
    -- a on the RHS is the outer a, a on the LHS is being declared
    local a = a
    print("I am f")
    print("My a is")
    print(a)
    a = a * 2
    print("I multiplied it by 2, see")
    print(a)
end

print("I am the main function")
print(a)
a = a + 5
print(a)
print("Calling f")
f()
print("Back to main, my a is still 105")
print(a)
