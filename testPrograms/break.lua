-- Break can be used in Lua to break out of while loops, and both types of for loops, numeric and generic

local x = 1
while (x < 10) do
    if (x == 5) then
        print("5, break from while")
        break
    end
    print("x is")
    print(x)
    print("incrementing")
    x = x + 1
    print("repeating loop")
end

print("Inbetween while and for")

for x = 0, 10, 2 do
    if (x == 6) then
        print("6, break from numeric for")
        break
    end
    print("x is")
    print(x)
    print("incrementing")
    x = x + 1
    print("repeating loop")
end

print("Done, x should be 5 (since the for loop x is local)")
print(x)

table = {"A", "B", "C", "D", "E"}
for i, v in ipairs(table) do
    print(i)
    print(v)
    if (v == "C") then
        break
    end
end
