const Discord = require('discord.js');
const Canvas = require('canvas')
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

const replies = [ 'LOL', 'XD', 'HAHA', 'DUDE NICE', 'ROFL', '#EPIC' ];

client.once('ready', () => {
    console.log('Ready');
})

client.on('message', async message => {
    if (message.content.startsWith(`${prefix}meme`)){
        let info = message.content.slice(6);
        info = info.split("->");

        if (info.length === 2){
            create_image(info[0], info[1], message.channel);

            //message.channel.send("LOL", attachment);
        }
        else if (info[0].toLowerCase().includes('help')) {
            message.channel.send("Yo it's Meme-Bot here\n Here are some of the wacky memes you can create:\n -Fancy Winnie the Pooh (winnie_fancy + 2 arguments)\n -Change my mind (change_my_mind + 1 argument)\n -Car drift (car_drift + 2 arguments)");
        }
    }
})

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};


async function create_image(image_name, meme_details, channel) {
    //Create the canvas
    const canvas = Canvas.createCanvas(700, 700);
    const ctx = canvas.getContext('2d');

    //Set the background to whatever the person chose
    const background = await Canvas.loadImage(`./templates/${image_name}.jpg`);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    //Font size
    const font_size = 35;

    //Create a random reply
    const text_reply = replies[Math.floor(Math.random() * replies.length)];

    //Center align the text
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";

    // Select the font size and type from one of the natively available fonts
	ctx.font = `${font_size}px arial`;
	// Select the style that will be used to fill the text in
    ctx.fillStyle = '#000000';
    
    //Winnie fancy meme
    if (image_name === 'winnie_fancy'){
        //split the text of the memes by panel
        let parts = meme_details.split("-");
        let x_pos = canvas.width * .7;
        let y_pos = canvas.height / 5;

        let current_line = "";

        const max_line = 18;

        //console.log(parts[0]);

        //Split the panels of the meme
        parts[0] = parts[0].toUpperCase();
        parts[1] = parts[1].toUpperCase();

        //Word wrap for first panel
        for (let i = 0; i < parts[0].length; i++){
            current_line += parts[0][i];
            if (current_line.length >= max_line){
                let go_back = 0;
                while (!current_line.endsWith(" ")) {
                    current_line = current_line.slice(0, current_line.length - 1);
                    go_back++;
                }
                ctx.fillText(current_line, x_pos, y_pos);
                y_pos += font_size;
                i -= go_back;
                current_line = "";
            }
        }

        ctx.fillText(current_line, x_pos, y_pos);

        y_pos = canvas.height * .7
        
        current_line = "";

        //Word wrap for second panel
        for (let i = 0; i < parts[1].length; i++){
            current_line += parts[1][i];
            if (current_line.length >= max_line){
                let go_back = 0;
                while (!current_line.endsWith(" ")) {
                    current_line = current_line.slice(0, current_line.length - 1);
                    go_back++;
                }
                //console.log(current_line);
                ctx.fillText(current_line, x_pos, y_pos);
                y_pos += font_size;
                i -= go_back;
                current_line = "";
            }
        }
        ctx.fillText(current_line, x_pos, y_pos);
    
    } 
    //Change my mind meme
    else if (image_name === 'change_my_mind') { 
        let x_pos = canvas.width * .7;
        let y_pos = canvas.height * .67;

        const max_line = 20;

        let current_line = "";
        meme_details = meme_details.toUpperCase();

        for (let i = 0; i < meme_details.length; i++){
            current_line += meme_details[i];
            if (current_line.length >= max_line) {
                let go_back = 0;
                while (!current_line.endsWith(" ")){
                    current_line = current_line.slice(0, current_line.length - 1);
                    go_back++;
                }
                
                ctx.fillText(current_line, x_pos, y_pos);
                y_pos += font_size;
                i -= go_back;
                current_line = "";
            }
        }
        ctx.fillText(current_line, x_pos, y_pos);
    }
    //Car drift
    else if (image_name === 'car_drift') {
        //Font size
        const font_size = 25;
        // Select the font size and type from one of the natively available fonts
	    ctx.font = `${font_size}px arial`;
        ctx.fillStyle = '#FFFFFF';

        let x_pos = canvas.width * .3;
        let y_pos = canvas.height / 6;

        const first_max_line = 10;
        const second_max_line = 13;
        
        //Split the text of the meme by panel
        let parts = meme_details.split("-");
        parts[0] = parts[0].toUpperCase();
        parts[1] = parts[1].toUpperCase();

        let current_line = "";

        for (let i = 0; i < parts[0].length; i++){
            current_line += parts[0][i];
            if (current_line.length >= first_max_line) {
                let go_back = 0;
                while (!current_line.endsWith(" ")){
                    current_line = current_line.slice(0, current_line.length - 1);
                    go_back++;
                }
                
                ctx.fillText(current_line, x_pos, y_pos);
                y_pos += font_size;
                i -= go_back;
                current_line = "";
            }
        }
        ctx.fillText(current_line, x_pos, y_pos);

        current_line = "";
        x_pos = canvas.width * .6;
        y_pos = canvas.height / 6;

        for (let i = 0; i < parts[1].length; i++){
            current_line += parts[1][i];
            if (current_line.length >= second_max_line) {
                let go_back = 0;
                while (!current_line.endsWith(" ")){
                    current_line = current_line.slice(0, current_line.length - 1);
                    go_back++;
                }
                
                ctx.fillText(current_line, x_pos, y_pos);
                y_pos += font_size;
                i -= go_back;
                current_line = "";
            }
        }
        ctx.fillText(current_line, x_pos, y_pos);
    }
    //mocking spongebob
    else if (image_name === 'mocking_spongebob'){
        //Font size
        const font_size = 60;
        // Select the font size and type from one of the natively available fonts
	    ctx.font = `${font_size}px arial`;
        ctx.fillStyle = '#FFFFFF';
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#000000';

        let x_pos = canvas.width / 2;
        let y_pos = canvas.height / 9;

        const max_line = 20;
        const max_section = 2;

        formatted_details = "";
        for (let i = 0; i < meme_details.length; i++){
            let upper = Math.random();
            if (upper >= 0.5){
                formatted_details += meme_details[i].toUpperCase();
            }
            else {
                formatted_details += meme_details[i].toLowerCase();
            }
        }

        let current_line = "";
        let current_down = 0;

        for (let i = 0; i < formatted_details.length; i++){
            current_line += formatted_details[i];
            if (current_line.length >= max_line) {
                let go_back = 0;
                while (!current_line.endsWith(" ")){
                    current_line = current_line.slice(0, current_line.length - 1);
                    go_back++;
                }
                
                ctx.strokeText(current_line, x_pos, y_pos);
                ctx.fillText(current_line, x_pos, y_pos);
                y_pos += font_size;
                i -= go_back;
                current_line = "";
                current_down++;
            }
            if (current_down === max_section){
                y_pos += canvas.height * .6;
                current_down++; 
            }
        }
        ctx.strokeText(current_line, x_pos, y_pos);
        ctx.fillText(current_line, x_pos, y_pos);        
    }

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'meme.png');

    channel.send(text_reply, attachment);
}


client.login(token);