var app = new Vue({
    el : '#root',
    data : {
        myAvatar: 'imgs/me.png',
        current: {},
        currentIndex: 0,
        newMess: '',
        search: '',
        selectedMsg: null,
        contacts: [
                    {
                        name: 'Michele',
                        avatar: 'imgs/av1.jpg',
                        visible: true,
                        messages: [
                                {
                                    date: '10/01/2020 15:30:55',
                                    message: 'Hai portato a spasso il cane?',
                                    status: 'sent',
                                    isActive: false
                                },
                                {
                                    date: '10/01/2020 15:50:00',
                                    message: 'Ricordati di dargli da mangiare',
                                    status: 'sent',
                                    isActive: false
                                },
                                {
                                    date: '10/01/2020 16:15:22',
                                    message: 'Tutto fatto!',
                                    status: 'received',
                                    isActive: false
                                }
                            ],
                    },
                    {
                        name: 'Fabio',
                        avatar: 'imgs/av2.jpg',
                        visible: true,
                        messages: [
                                {
                                    date: '10/03/2020 16:30:00',
                                    message: 'Ciao come stai?',
                                    status: 'sent',
                                    isActive: false
                                },
                                {
                                    date: '10/03/2020 16:30:55',
                                    message: 'Bene grazie! Stasera ci vediamo?',
                                    status: 'received',
                                    isActive: false
                                },
                                {
                                    date: '08/03/2020 16:35:00',
                                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                                    status: 'received',
                                    isActive: false
                                }
                            ],
                    },
                    {
                        name: 'Samuele',
                        avatar: 'imgs/av3.jpg',
                        visible: true,
                        messages: [
                                {
                                    date: '28/03/2020 10:10:40',
                                    message: 'La Marianna va in campagna',
                                    status: 'received',
                                    isActive: false
                                },
                                {
                                    date: '28/03/2020 10:20:10',
                                    message: 'Sicuro di non aver sbagliato chat?',
                                    status: 'sent',
                                    isActive: false
                                },
                                {
                                    date: '28/03/2020 16:15:22',
                                    message: 'Ah scusa!',
                                    status: 'received',
                                    isActive: false
                                }
                            ],
                    },
                    {
                        name: 'Luisa',
                        avatar: 'imgs/av5.jpg',
                        visible: true,
                        messages: [
                                {
                                    date: '10/01/2020 15:30:55',
                                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                                    status: 'sent',
                                    isActive: false
                                },
                                {
                                    date: '10/01/2020 15:50:00',
                                    message: 'Si, ma preferirei andare al cinema',
                                    status: 'received',
                                    isActive: false
                                }
                            ],
                    },
                ]
            },
            methods: {
                //creo funzione che quando faccio click mi prende l'oggetto corrente
                getUser(obj, i) {
                    this.current = obj;
                    this.currentIndex = i;
                    // console.log(i);
                    // console.log(obj);
                    this.scroll();
                },
                //creo funzione per la risposta automatica qnd l'utente inserisce nell'input
                autoAnswer() {
                    var answer = {
                        date: dayjs().format('DD/MM/YYYY  HH:mm:ss'),
                        message: 'ok',
                        status: 'received',
                        isActive: false
                    };
                    this.contacts[this.currentIndex].messages.push(answer);
                    this.scroll();
                },
                //funzione per la'input dell'utente viene pushato e dopo 1 sec arriva la risposta automatica
                addMsg() {
                    // var currentDate = dayjs().format(' H' + ':m')
                    // console.log(currentDate);
                    //creo nuova variabile per il nuovo mess
                    var newObj = {
                        date: dayjs().format('DD/MM/YYYY  HH:mm:ss'),
                        message: this.newMess,
                        status: 'sent',
                        isActive: false
                    };
                    //faccio push del nuovo oggetto all'oggetto corrente selezionato
                    this.contacts[this.currentIndex].messages.push(newObj);
                    //svuoto l'input
                    this.newMess = '';
                    this.scroll();
                    // console.log(newObj);
                    // creo time out after 1sec risposta automatica
                    setTimeout(() => {
                        this.autoAnswer();
                    }
                    , 1000);
                },
                view(msgIndex) {
                    // this.selectedMsg = selectedMsg;
                    // console.log(selectedMsg);

                    if(this.contacts[this.currentIndex].messages[msgIndex].isActive == false)
                    {
                        this.contacts[this.currentIndex].messages[msgIndex].isActive = true;
                    } else {
                        this.contacts[this.currentIndex].messages[msgIndex].isActive = false;
                    }
                },
                removeMsg(index) {
                    this.contacts[this.currentIndex].messages.splice(index, 1);
                },
                scroll() {
                    Vue.nextTick(function(){
                        let chatContainer = document.getElementsByClassName('chat-box')[0];
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    })
                },
                getDate(date) {
                    dayjs.extend(window.dayjs_plugin_customParseFormat);
                    return dayjs(date, 'DD/MM/YYYY  HH:mm:ss').format('H' + ':mm');
                },
                searchName() {

                    //creo, salvo e trasformo variabile tutto in lowercase
                    var searchedLowered = this.search.toLowerCase();
                    // console.log(searchedLowered);

                    //check di tutto contacts
                     this.contacts.forEach((item) => {
                         // console.log(item.name);

                        //creo , salvo e trasformo variabile del item. name into lowercase
                         var loweredName = item.name.toLowerCase();
                         // console.log(loweredName);

                         //check se item.name include la ricerca utente
                         if (loweredName.includes(searchedLowered)) {
                             //if includes makes item.visible true
                             item.visible = true;
                         } else {
                             //if does not include it makes false
                             item.visible = false;

                             //then im gonna check v-if into the list
                             //if visibile is true then its going to show me the name with that search input
                         }
                         // console.log(item.visible);

                     });

                }
            },
            //faccio ricerca, creo funzione che mi filtra i nomi
            //usando il v-for usato per i nomi correnti
            //trasformo i nomi e il search tutto in minuscolo per facilitare la ricerca
            // computed: {
            //     filteredNames() {
            //       return this.contacts.filter((object) => {
            //           return object.name.toLowerCase().match(this.search.toLowerCase());
            //           if (!this.search) return null;
            //
            //       })
            //     }
            // },
            mounted: function(){
                this.scroll();
                // console.log(dayjs(this.answer.date).format('YYYY' + ' MM' + ' DD'));
            }
});
