-- A test of global variables

x = 5

do
    -- Locally scoped variables don't modify larger ones
    local x = x
    x = x + 1
    print(x)
end

print(x)

function f()
    -- We can access this global variable through this function
    print(x)
end

f()

-- All variables are stored inside the global table _G, indexed by strings
_G["f"]()
-- Since _G is a global, this is legal
print(_G._G._G._G._G.x)
