#!/bin/bash

# Function to recursively get the structure of directories and files
get_directory_structure() {
    local dir="$1"
    local depth="$2"
    shift 2
    local omit_dirs=("$@")
    
    local items=()
    
    # Read items in the directory, excluding omitted directories
    for item in "$dir"/*; do
        local basename=$(basename "$item")
        if [[ ! " ${omit_dirs[@]} " =~ " ${basename} " ]]; then
            items+=("$item")
        fi
    done

    local count=${#items[@]}

    for ((i=0; i<count; i++)); do
        local item="${items[$i]}"
        local basename=$(basename "$item")
        local is_last=$((i == count - 1))
        local prefix="├──"
        local spacer="│   "

        if [ "$is_last" -eq 1 ]; then
            prefix="└──"
            spacer="    "
        fi

        # Print the current directory or file
        printf "%*s%s %s\n" "$((depth * 4))" "" "$prefix" "$basename"

        # If it's a directory, recursively call the function
        if [ -d "$item" ]; then
            get_directory_structure "$item" $((depth + 1)) "${omit_dirs[@]}"
        fi
    done
}

# Parse command line arguments
if [ $# -lt 2 ]; then
    echo "Usage: $0 <input-directory> <output-file> [omit-directories]"
    exit 1
fi

input_dir="$1"
output_file="$2"
IFS=',' read -ra omit_dirs <<< "$3"  # Convert comma-separated omit directories into an array

# Generate the directory structure and save it to a file
get_directory_structure "$input_dir" 0 "${omit_dirs[@]}" > "$output_file"

echo "Directory structure has been written to $output_file"
