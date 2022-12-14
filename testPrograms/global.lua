x = 5

do
    local x = x
    x = x + 1
    print(x)
end

print(x)

function f()
    print(x)
end

f()


_G["f"]()
print(_G._G._G._G._G.x)
