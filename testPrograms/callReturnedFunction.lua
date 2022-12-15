-- Functions are first class values in Lua, so this should be allowed
-- We can see here alternating between placing functions in the global scope and the local scope

local function f(w)
    function g(x)
        local function h(y)
            function i(z)
                print("My values are")
                print(w)
                print(x)
                print(y)
                print(z)
            end
            return i
        end
        return h
    end
    return g
end

f("a")(true)(1)(-100)
