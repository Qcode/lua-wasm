-- do blocks allow us to separate scopes

local a = 1

do
    local a = a
    a = a + 1
    print("Nested a:")
    print(a)
end
print("Outer a:")
print(a)
