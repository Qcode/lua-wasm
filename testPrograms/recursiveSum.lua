local recursiveSum = function(n)
	local recursiveSumHelper
	recursiveSumHelper = function(acc)
		if (n == 0) then
			return acc
		end
        acc = acc + n
        n = n - 1
		return recursiveSumHelper(acc)
	end
	return recursiveSumHelper(0)
end

local result = recursiveSum(10)
print(result)
