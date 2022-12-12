local function f(x)
    local function g()
        print("My value is")
        print(x)
    end

    return g
end

f(5)()
