#!/bin/bash

rm -f ./data/styled-component.json
echo $'{}' > ./data/styled-component.json
rm -f ./data/component.json
echo $'{}' > ./data/component.json
rm -f ./data/size.json
echo $'{}' > ./data/size.json
rm -f ./data/token-count-raw.json
echo $'{}' > ./data/token-count-raw.json
cd ../2web2ui

sy=2018
sm=06
ey=`date +"%Y"`
em=`date +"%m"`
for y in {2018..2020}; do
    for m in $(seq -f "%02g" 01 12); do
        if [ $y = $sy ] && [ $m -lt $sm ]; then
            continue
        fi
        if [ $y = $ey ] && [ $m -gt $em ]; then
            break
        fi

        d="${y}-${m}-01"
        git checkout `git rev-list -n 1 --before="${d} 12:00" master`
        node ../ux-okr-dashboard/scripts/styled-component.js $d
        node ../ux-okr-dashboard/scripts/token-count.js $d
        node ../ux-okr-dashboard/scripts/size.js $d
        node ../ux-okr-dashboard/scripts/component.js $d
    done
done
