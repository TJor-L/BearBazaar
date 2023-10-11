
codehistories() {
	if [ "$#" -eq 0 ]; then
		echo "Usage: codehistories <command> [args]"
		return
	fi
	cmd="$*"
	
	# Get current date and time in the format [M/D/YYYY, HH:MM:SS AM/PM]
	timestamp=$(date +"[%-m/%-d/%Y, %I:%M:%S %p]")
	
	# Print a newline and the timestamp to output.txt
	echo -e "
Execution Time: $timestamp" | tee -a output.txt
	
	# Execute the command and append the output
	eval "$cmd" 2>&1 | tee -a output.txt
}