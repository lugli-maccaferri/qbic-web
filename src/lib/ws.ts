export default {

    async parseMessage(msg: MessageEvent, auth: boolean){

        const data = new Blob([msg.data]);
        if(data.size == 3){
            const buf_data = new Uint8Array(await data.arrayBuffer());
            const str_response = parseInt(`${buf_data[0]}${buf_data[1]}${buf_data[2]}`); 

            return str_response;
        }

        return msg.data;

    }

}