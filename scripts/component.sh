#!/bin/bash

# rm -f ./data/styled-component.json
# echo $'{}' > ./data/styled-component.json
# rm -f ./data/component.json
# echo $'{}' > ./data/component.json
# rm -f ./data/size.json
# echo $'{}' > ./data/size.json
# rm -f ./data/token-count-raw.json
# echo $'{}' > ./data/token-count-raw.json
cd ../2web2ui

# node ../ux-okr-dashboard/scripts/component-breakdown.js

# for i in `seq 1 104`
# do
#     dt=$(date -v "-$i"w +%Y-%m-%d)  
#     echo $dt
#     git checkout `git rev-list -n 1 --before="${dt} 12:00" master`
#     node ../ux-okr-dashboard/scripts/styled-component.js $dt
#     node ../ux-okr-dashboard/scripts/token-count.js $dt
#     node ../ux-okr-dashboard/scripts/size.js $dt
#     node ../ux-okr-dashboard/scripts/component.js $dt
# done

# dt=$(date -v "-5"d +%Y-%m-%d)  
# echo $dt
# git checkout `git rev-list -n 1 --before="${dt} 12:00" master`
# node ../ux-okr-dashboard/scripts/styled-component.js $dt
# node ../ux-okr-dashboard/scripts/token-count.js $dt
# node ../ux-okr-dashboard/scripts/size.js $dt
# node ../ux-okr-dashboard/scripts/component.js $dt

# dt=$(date -v "-12"d +%Y-%m-%d)  
# echo $dt
# git checkout `git rev-list -n 1 --before="${dt} 12:00" master`
# node ../ux-okr-dashboard/scripts/styled-component.js $dt
# node ../ux-okr-dashboard/scripts/token-count.js $dt
# node ../ux-okr-dashboard/scripts/size.js $dt
# node ../ux-okr-dashboard/scripts/component.js $dt

# dt=$(date -v "-19"d +%Y-%m-%d)  
# echo $dt
# git checkout `git rev-list -n 1 --before="${dt} 12:00" master`
# node ../ux-okr-dashboard/scripts/styled-component.js $dt
# node ../ux-okr-dashboard/scripts/token-count.js $dt
# node ../ux-okr-dashboard/scripts/size.js $dt
# node ../ux-okr-dashboard/scripts/component.js $dt