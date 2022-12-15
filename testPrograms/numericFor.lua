local sum = 0

-- Can specify steps
for x = 1, 10, 2 do
    sum = sum + x
end

for x = 100, 1, -2 do
    print(x)
end

-- Step is 1 by default
for y = -5, 0 do
    print(y)
end

print(sum)
