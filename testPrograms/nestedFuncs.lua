-- An example testing nested functions

local function f()
    print("Entering f")
    local function g()
        print("Entering g")
        local function h()
            print("Entering h")
            print("Exiting h")
        end
        print("Calling h")
        h()
        print("Exiting g")
    end
    print("Calling g")
    g()
    print("Exiting f")
end

print("Calling f")
f()
print("Done!")
