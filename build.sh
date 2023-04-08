#!/bin/bash

# settings
zip_name='page.zip'
serve_cmd='python3 -m http.server'
open_cmd='xdg-open http://localhost:8000'
minify_dir_cmd="html-minifier-terser --case-sensitive --collapse-boolean-attributes --collapse-inline-tag-whitespace --collapse-whitespace --conservative-collapse --decode-entities --no-include-auto-generated-tags --keep-closing-slash --minify-css true --minify-js true --minify-urls true --remove-comments --remove-empty-attributes --remove-empty-elements --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-style-link-type-attributes --remove-tag-whitespace --input-dir ./_build --output-dir ./_build"
minify_html_cmd="$minify_dir_cmd --file-ext html"
minify_css_cmd="$minify_dir_cmd --file-ext css"
minify_js_cmd="$minify_dir_cmd --file-ext js"

# vars
declare -A pids

# parse args
build='false'
watch='false'
serve='false'
zip='false'

args=( "$@" )
for arg in ${args[@]}; do
    case $arg in
        'build')
            serve='false'
            build='true';;
        'watch')
            watch='true';;
        'serve')
            serve='true';;
        'zip')
            build='true'
            zip='true';;
    esac
done

# echo settings
echo "Building: $build"
echo "Watching: $watch"
echo "Serving: $serve"
echo "Zipping: $zip"

# build
if [[ "$build" == 'true' ]]; then
    blogc-make clean
    blogc-make all
fi

# watch
if [[ "$watch" == 'true' && "$serve" == 'true' ]]; then
    blogc-make watch &
    pid="$!"
    cd "_build"
    $serve_cmd
    cd ..
    kill $pid
else
    if [[ "$watch" == 'true' ]]; then
        blogc-make watch
    fi

    # serve
    if [[ "$serve" == 'true' ]]; then
        cd "_build"
        $serve_cmd
        cd ..
    fi
fi

# zip (includes minimisation)
if [[ "$zip" == 'true' ]]; then
    $minify_html_cmd
    $minify_css_cmd
    $minify_js_cmd

    cd "_build"
    zip -9rvo $zip_name ./*
    mv $zip_name ../
    cd ..
fi
