-- String concatenation is supported in my implementation
-- Allocation happens on the heap, we want to make sure that
-- even if one is stored in the data segment (like result), we still have
-- a .. second == result (despite them stored in different locations)
local a = "a"
local second = "b"

local result = "ab"

print(a .. second)
print(result)
print((a .. second) == result)

local fiveAs = "aaaaa"
local loop = ""

for x = 1, 5 do
    print("iteration")
    print(x)
    print("loop is")
    print(loop)
    print(loop == fiveAs)
    print(loop ~= fiveAs)
    loop = loop .. a
end

print("done")
print(loop)
print(fiveAs)
print(loop == fiveAs)
