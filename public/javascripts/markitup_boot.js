jQuery(function() {
myTextileSettings = {
    nameSpace:           "textile", // Useful to prevent multi-instances CSS conflict
    previewParserPath:   "~/preview",
    onShiftEnter:        {keepDefault:false, replaceWith:'\n\n'},
    markupSet: [
        {name:'Heading 1', key:'1', openWith:'h1(!(([![Class]!]))!). ', placeHolder:'Skriv en overskrift...' },
        {name:'Heading 2', key:'2', openWith:'h2(!(([![Class]!]))!). ', placeHolder:'Skriv en overskrift...' },
        {name:'Heading 3', key:'3', openWith:'h3(!(([![Class]!]))!). ', placeHolder:'Skriv en overskrift...' },
        {name:'Heading 4', key:'4', openWith:'h4(!(([![Class]!]))!). ', placeHolder:'Skriv en overskrift...' },
        {name:'Heading 5', key:'5', openWith:'h5(!(([![Class]!]))!). ', placeHolder:'Skriv en overskrift...' },
        {name:'Heading 6', key:'6', openWith:'h6(!(([![Class]!]))!). ', placeHolder:'Skriv en overskrift...' },
        {name:'Paragraph', key:'P', openWith:'p(!(([![Class]!]))!). '}, 
        {separator:'---------------' },
        {name:'Bold', key:'B', closeWith:'*', openWith:'*'}, 
        {name:'Italic', key:'I', closeWith:'_', openWith:'_'}, 
        {name:'Strike through', key:'S', closeWith:'-', openWith:'-'}, 
        {separator:'---------------' },
        {name:'Bulleted list', openWith:'(!(* |!|*)!)'}, 
        {name:'Numeric list', openWith:'(!(# |!|#)!)'}, 
        {separator:'---------------' },
        {name:'Image', replaceWith:'![![Source:!:http://]!]([![Alternativ tekst]!])!'}, 
        {name:'Link', openWith:'"', closeWith:'([![Title]!])":[![Link:!:http://]!]', placeHolder:'Tekst i lenke her ...' },
        {separator:'---------------' },
        {name:'Quote', openWith:'bq(!(([![Class]!]))!). '}, 
        {name:'Code', openWith:'@', closeWith:'@'}, 
        {separator:'---------------' },       
        {name:'Preview', call:'preview', className:'preview'}
    ]
}

  jQuery('#article_body').markItUp(myTextileSettings);
});
