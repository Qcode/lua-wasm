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
