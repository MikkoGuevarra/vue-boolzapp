var app = new Vue({
    el : '#root',
    data : {
        myAvatar: 'imgs/me.png',
        current: {},
        currentIndex: 0,
        newMess: '',
        search: '',
        viewWin: false,
        selectedMsg: null,
        msgIndex: 0,
        answer: {
            date: '10/01/2020 15:30:55',
            message: 'ok',
            status: 'received'
        },
        contacts: [
                    {
                        name: 'Michele',
                        avatar: 'imgs/av1.jpg',
                        visible: true,
                        messages: [
                                {
                                    date: '10/01/2020 15:30:55',
                                    message: 'Hai portato a spasso il cane?',
                                    status: 'sent'
                                },
                                {
                                    date: '10/01/2020 15:50:00',
                                    message: 'Ricordati di dargli da mangiare',
                                    status: 'sent'
                                },
                                {
                                    date: '10/01/2020 16:15:22',
                                    message: 'Tutto fatto!',
                                    status: 'received'
                                }
                            ],
                    },
                    {
                        name: 'Fabio',
                        avatar: 'imgs/av2.jpg',
                        visible: true,
                        messages: [
                                {
                                    date: '20/03/2020 16:30:00',
                                    message: 'Ciao come stai?',
                                    status: 'sent'
                                },
                                {
                                    date: '20/03/2020 16:30:55',
                                    message: 'Bene grazie! Stasera ci vediamo?',
                                    status: 'received'
                                },
                                {
                                    date: '20/03/2020 16:35:00',
                                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                                    status: 'received'
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
                                    status: 'received'
                                },
                                {
                                    date: '28/03/2020 10:20:10',
                                    message: 'Sicuro di non aver sbagliato chat?',
                                    status: 'sent'
                                },
                                {
                                    date: '28/03/2020 16:15:22',
                                    message: 'Ah scusa!',
                                    status: 'received'
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
                                    status: 'sent'
                                },
                                {
                                    date: '10/01/2020 15:50:00',
                                    message: 'Si, ma preferirei andare al cinema',
                                    status: 'received'
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
                },
                //creo funzione per la risposta automatica qnd l'utente inserisce nell'input
                autoAnswer() {
                    this.contacts[this.currentIndex].messages.push(this.answer);
                },
                //funzione per la'input dell'utente viene pushato e dopo 1 sec arriva la risposta automatica
                addMsg(newObj) {
                    //creo nuova variabile per il nuovo mess
                    var newObj= {
                        date: '10/01/2020 15:30:55',
                        message: '',
                        status: 'sent'
                    };
                    //assoccio il nuovo mess all'oggetto
                    newObj.message = this.newMess;
                    //faccio push del nuovo oggetto all'oggetto corrente selezionato
                    this.contacts[this.currentIndex].messages.push(newObj);
                    //svuoto l'input
                    this.newMess = '';
                    console.log(newObj);
                    // creo time out after 1sec risposta automatica
                    setTimeout(() => {
                        this.autoAnswer();
                    }
                    , 1000);
                },
                view(selectedMsg, msgIndex) {
                    this.selectedMsg = selectedMsg;
                    console.log(selectedMsg);
                    // console.log(this.contacts[this.currentIndex].messages);
                    console.log(msgIndex);
                    console.log(this.contacts[this.currentIndex].messages[msgIndex]);
                    if (selectedMsg == (this.contacts[this.currentIndex].messages[msgIndex])) {
                        this.viewWin = !this.viewWin;
                    }
                }

            },
            //faccio ricerca, creo funzione che mi filtra i nomi
            //usando il v-for usato per i nomi correnti
            //trasformo i nomi e il search tutto in minuscolo per facilitare la ricerca
            computed: {
                filteredNames() {
                  return this.contacts.filter((object) => {
                      return object.name.toLowerCase().match(this.search.toLowerCase())
                  })
                }
              }
});
