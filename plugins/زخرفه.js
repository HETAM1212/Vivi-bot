cmd({
            pattern: "زخرفة",
            desc: "Makes stylish/fancy given text",
            category: "تحويل",
            use: '56 Rin',
            react: "✅",
            filename: __filename
        },
        async(Void, citel, text) => {
            if (isNaN(text.split(" ")[0]) || !text) {
                let text = tiny(
                    "زخرفة \n\مثال: .زخرفة 32 Rin\n\n"
                );
                listall("Rin").forEach((txt, num) => {
                    text += `${(num += 1)} ${txt}\n`;
                });
                return await citel.reply(text);
            }

            let fancytextt = await fancytext(`${text.slice(2)}`, text.split(" ")[0])
            citel.reply(fancytextt)

        }
    )
