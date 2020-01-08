#!/bin/bash

rm ./src/raw-data/size.json
echo $'{}' > ./src/raw-data/size.json
cd ../2web2ui

sy=2017
sm=07
ey=`date +"%Y"`
em=`date +"%m"`
for y in {2017..2020}; do
    for m in $(seq -f "%02g" 01 12); do
        if [ $y = $sy ] && [ $m -lt $sm ]; then
            continue
        fi
        if [ $y = $ey ] && [ $m -gt $em ]; then
            break
        fi

        d="${y}-${m}-01"
        git checkout `git rev-list -n 1 --before="${d} 12:00" master`
        node ../ux-okr-dashboard/scripts/size.js $d
    done
done
