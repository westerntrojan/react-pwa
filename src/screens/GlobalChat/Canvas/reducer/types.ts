import {IMessage} from '@components/common/chats/types';

export const SELECT_MESSAGE = 'chat/canvas/selectMessage';
export const CLEAR_SELECTED_MESSAGES = 'chat/canvas/clearSelectedMessages';
export const SET_EDITED_MESSAGE = 'chat/canvas/setEditedMessage';
export const REMOVE_EDITED_MESSAGE = 'chat/canvas/removeEditedMessage';
export const OPEN_REMOVE_MESSAGES_MODAL = 'chat/canvas/openRemoveMessagesModal';
export const CLOSE_REMOVE_MESSAGES_MODAL = 'chat/canvas/closeRemoveMessagesModal';
export const REMOVE_MESSAGES = 'chat/canvas/removeMessages';

type SelectMessage = {
	type: typeof SELECT_MESSAGE;
	payload: {
		messageId: string;
	};
};
type ClearSelectedMessages = {
	type: typeof CLEAR_SELECTED_MESSAGES;
};
type SetEditedMessage = {
	type: typeof SET_EDITED_MESSAGE;
	payload: {
		message: IMessage;
	};
};
type RemoveEditedMessage = {
	type: typeof REMOVE_EDITED_MESSAGE;
};
type OpenRemoveMessagesModal = {
	type: typeof OPEN_REMOVE_MESSAGES_MODAL;
};
type CloseRemoveMessagesModal = {
	type: typeof CLOSE_REMOVE_MESSAGES_MODAL;
};
type RemoveMessages = {
	type: typeof REMOVE_MESSAGES;
};

export type Action =
	| SelectMessage
	| ClearSelectedMessages
	| SetEditedMessage
	| RemoveEditedMessage
	| OpenRemoveMessagesModal
	| CloseRemoveMessagesModal
	| RemoveMessages;

export type State = {
	selectedMessages: string[];
	removeMessagesModal: boolean;
	editedMessage: IMessage | null;
};
