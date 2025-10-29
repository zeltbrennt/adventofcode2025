#! /bin/fish

set year $argv[1]
set day $argv[2]

set day_format (printf '%02d' $day)

curl "https://adventofcode.com/$year/day/$day/input" -b "session=$AOC_COOKIE" -o "./input/$day_format.txt"

sed "s/00/$day_format/g" template.ts >"./solutions/$day_format.ts"
