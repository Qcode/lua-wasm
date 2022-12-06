function g()
	print("Hello")
end

function f()
	local g = 5
	function g()
		print("World")
	end
end

f()
g()
