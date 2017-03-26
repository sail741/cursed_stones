exports.STATUS_WAIT = "WAIT";
exports.STATUS_PAUSED = "PAUSED";
exports.STATUS_START = "START";
exports.STATUS_END = "END";
exports.MAX_PLAYER = 2;
exports.TIMER_TOUR = 12000;
exports.MAX_MANA = 9;
exports.TIMER_RECONNEXION = 10000;
exports.ETAT_PIOCHE = "pioche";
exports.ETAT_PLAYING = "playing";
exports.ETAT_STAY = "stay";
exports.NB_CARD_START_FIRST_PLAYER = 4;
exports.NB_CARD_START_SECOND_PLAYER = 5;
exports.WIDTH_SIZE = 16;
exports.HEIGHT_SIZE = 8;
exports.WIDTH_PLAYER_ZONE = 5;

exports.LEFT = 'left';
exports.RIGHT = 'right';

exports.ERROR_NOT_IN_GOOD_ZONE = "Vous ne pouvez pas placer de carte ici";
exports.ERROR_ENTITY_ALREADY_HERE = "Un personnage est déjà présent sur cette case";
exports.UID_NOT_EXIST_IN_HAND = "La carte a été altérée";
exports.CARD_ALTERED = "La carte a été altérée";
exports.NEED_MORE_MANA = "Vous avez besoin de plus de mana";
exports.IMPOSSIBLE_DELETE_CARD_IN_HAND = "Impossible de supprimé la carte de votre main, elle n'existe plus";
exports.POSITION_INVALID = "La position demandé est invalide";
exports.POSITION_OUT_OF_BAND = "La position est en dehors des limites";
exports.EMPTY_DECK = "plus de carte";
exports.GAME_NAME_ALREADY_EXIST = "le nom de partie est déja utilisé";
exports.GAME_FULL = "la partie est complète";
exports.NO_ENTITY_IN_POSITION = "pas d'entité sur cette case";
exports.NEED_MORE_MOVEMENT = "vous n'avez pas assez de point de mouvement";
exports.IS_NOT_YOUR_TURN = "ce n'est pas à votre tour";


exports.SOCKET_DISCONNECT = "disconnect";
exports.SOCKET_SIGNAL_DISCONNECT = "signalDisconnect";
exports.SOCKET_CHAT = "chat";
exports.SOCKET_NEW_TOUR = "nouveauTour";
exports.SOCKET_FIRST_HAND = "FirstHand";
exports.SOCKET_MESSAGE = "message";
exports.SOCKET_GET_CARD = "piocheCarte";
exports.SOCKET_INFORMATION = "information";
exports.SOCKET_PLACE_CARD = "placeCard";
exports.SOCKET_OPPENENT_NOTIFY_CHANGE = "adversaireChange";
exports.SOCKET_EDIT_BOARD = "editBoard";
exports.SOCKET_SYNC_BOARD = "syncBoard";
exports.SOCKET_MOVE_ENTITY = "moveEntity";
exports.SOCKET_SET_SLIDE = "setSlide";
