<!DOCTYPE html>
<html>
<head>
	<title>{{title}}</title>
    <style>
        body{
            padding: 30px;
        }
        a{
            display: block;
        }
    </style>
</head>
<body>
<!-- http://handlebarsjs.com/ !-->

{{#each files}}
    <a href={{../dir}}/{{this}}>{{this}}</a>
{{/each}}
</body>
</html>