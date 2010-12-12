jQuery(function() {
myTextileSettings = {
    nameSpace:           "textile", // Useful to prevent multi-instances CSS conflict
    previewParserPath:   "~/preview",
    onShiftEnter:        {keepDefault:false, replaceWith:'\n\n'},
    markupSet: [
        {name:'Overskrift 1', key:'1', openWith:'h1(!(([![Class]!]))!). ', placeHolder:'Skriv en overskrift...' },
        {name:'Overskrift 2', key:'2', openWith:'h2(!(([![Class]!]))!). ', placeHolder:'Skriv en overskrift...' },
        {name:'Overskrift 3', key:'3', openWith:'h3(!(([![Class]!]))!). ', placeHolder:'Skriv en overskrift...' },
        {name:'Overskrift 4', key:'4', openWith:'h4(!(([![Class]!]))!). ', placeHolder:'Skriv en overskrift...' },
        {name:'Overskrift 5', key:'5', openWith:'h5(!(([![Class]!]))!). ', placeHolder:'Skriv en overskrift...' },
        {name:'Overskrift 6', key:'6', openWith:'h6(!(([![Class]!]))!). ', placeHolder:'Skriv en overskrift...' },
        {name:'Paragraf', key:'P', openWith:'p(!(([![Class]!]))!). '}, 
        {separator:'---------------' },
        {name:'Bold', key:'B', closeWith:'*', openWith:'*'}, 
        {name:'Kursiv', key:'I', closeWith:'_', openWith:'_'}, 
        {name:'Gjennomstreking', key:'S', closeWith:'-', openWith:'-'}, 
        {separator:'---------------' },
        {name:'Bulleted-liste', openWith:'(!(* |!|*)!)'}, 
        {name:'Numerisk liste', openWith:'(!(# |!|#)!)'}, 
        {separator:'---------------' },
        {name:'Bilde', replaceWith:'![![Source:!:http://]!]([![Alternativ tekst]!])!'}, 
        {name:'Lenke', openWith:'"', closeWith:'([![Title]!])":[![Link:!:http://]!]', placeHolder:'Tekst i lenke her ...' },
        {separator:'---------------' },
        {name:'Quotes', openWith:'bq(!(([![Class]!]))!). '}, 
        {name:'Kode', openWith:'@', closeWith:'@'}, 
        {separator:'---------------' },       
        {name:'Forhåndsvisning', call:'preview', className:'preview'}
    ]
}

  jQuery('#article_body').markItUp(myTextileSettings);
});
