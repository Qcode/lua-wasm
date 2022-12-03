z = 1

function f(x, y)
    local x = 5
    local z = z
    return function()
        local z = 2
        print("hello")
    end
end
