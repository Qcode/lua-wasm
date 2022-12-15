-- Fun example, using closures

local recursiveSum = function(n)
	local recursiveSumHelper
	recursiveSumHelper = function(acc)
		if (n == 0) then
			return acc
		end
        acc = acc + n
		-- Modifying n is the outer scope
        n = n - 1
		return recursiveSumHelper(acc)
	end
	return recursiveSumHelper(0)
end

print(recursiveSum(10))
