/* tslint:disable */
/* eslint-disable */
/**
 * NestJS Auth
 * The NestJS Auth API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CreateChatRoomDto
 */
export interface CreateChatRoomDto {
    /**
     * ChatRoom title
     * @type {string}
     * @memberof CreateChatRoomDto
     */
    title: string;
    /**
     * ChatRoom password
     * @type {string}
     * @memberof CreateChatRoomDto
     */
    password: string;
    /**
     * Creation date
     * @type {Date}
     * @memberof CreateChatRoomDto
     */
    creationDate: Date;
    /**
     * ChatRoom types
     * @type {string}
     * @memberof CreateChatRoomDto
     */
    chatRoomType: string;
    /**
     * user_id
     * @type {number}
     * @memberof CreateChatRoomDto
     */
    userId: number;
    /**
     * Participant role
     * @type {string}
     * @memberof CreateChatRoomDto
     */
    role: string;
}

/**
 * Check if a given object implements the CreateChatRoomDto interface.
 */
export function instanceOfCreateChatRoomDto(value: object): value is CreateChatRoomDto {
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('password' in value) || value['password'] === undefined) return false;
    if (!('creationDate' in value) || value['creationDate'] === undefined) return false;
    if (!('chatRoomType' in value) || value['chatRoomType'] === undefined) return false;
    if (!('userId' in value) || value['userId'] === undefined) return false;
    if (!('role' in value) || value['role'] === undefined) return false;
    return true;
}

export function CreateChatRoomDtoFromJSON(json: any): CreateChatRoomDto {
    return CreateChatRoomDtoFromJSONTyped(json, false);
}

export function CreateChatRoomDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateChatRoomDto {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'],
        'password': json['password'],
        'creationDate': (new Date(json['creation_date'])),
        'chatRoomType': json['chat_room_type'],
        'userId': json['user_id'],
        'role': json['role'],
    };
}

export function CreateChatRoomDtoToJSON(json: any): CreateChatRoomDto {
    return CreateChatRoomDtoToJSONTyped(json, false);
}

export function CreateChatRoomDtoToJSONTyped(value?: CreateChatRoomDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'title': value['title'],
        'password': value['password'],
        'creation_date': ((value['creationDate']).toISOString()),
        'chat_room_type': value['chatRoomType'],
        'user_id': value['userId'],
        'role': value['role'],
    };
}

