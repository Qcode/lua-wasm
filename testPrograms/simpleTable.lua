local table = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20}

for i = 1, 20 do
    print(table[i])
end

local table = { A = true }
local table2 = { "A" }

print(table[table2[1]])

local f = function()
    return 1, 2
end

local myTable = {"A", "B", "C"}


print(myTable[1])
print(myTable[2])
print(myTable[3])

myTable[1] = "D"
myTable[2] = "E"
myTable[3] = "F"

for i = 1, 3 do
    local result = myTable[i]
    print(result)
end


local f = function()
    return 3, 4
end

local table3 = {true, "blue", f()}
print(table3[1])
print(table3[2])
print(table3[3])
print(table3[4])

local largeTable = {}
local size = 100
for i = size, 1, -1 do
    largeTable[i] = size - i
end

for i = 1, size do
    print(largeTable[i])
end

local table4 = {f(), 5}
print(table4[1])
print(table4[2])
print(table4[3])

local myTable = {}
myTable.test = 5

print(myTable.test)

local table2 = { key = "Hello" }

print(table2.key)
print(table2["key"])

local table3 = {"a", "b", "c"}

local table4 = {1, 2, f()}

local table5 = {test = {}}
table5.test.bla = "world"

print(table5.test.bla)
print(table5["test"].bla)
print(table5.test["bla"])
print(table5["test"]["bla"])
