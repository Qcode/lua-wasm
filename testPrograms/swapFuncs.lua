-- We can swap function closures easily

local function f()
    print("I am f")
end

local function g()
    print("I am g")
end

f()
g()

print("Now, time for a switcharoo")

f, g = g, f

f()
g()
