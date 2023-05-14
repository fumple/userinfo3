/*
    Discord UserInfo 3
    Copyright (C) 2022 Fumple (fumple.pl)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
/* eslint-disable prettier/prettier */
// from https://discord.com/developers/docs

export const FLAGS = {
    [1 << 0]: "Discord Employee",
    [1 << 1]: "Partnered Server Owner",
    [1 << 2]: "HypeSquad Events Coordinator",
    [1 << 3]: "Bug Hunter Level 1",
    [1 << 6]: "House Bravery Member",
    [1 << 7]: "House Brilliance Member",
    [1 << 8]: "House Balance Member",
    [1 << 9]: "Early Nitro Supporter",
    [1 << 10]: "User is a team",
    [1 << 14]: "Bug Hunter Level 2",
    [1 << 16]: "Verified Bot",
    [1 << 17]: "Early Verified Bot Developer",
    [1 << 18]: "Discord Certified Moderator",
    [1 << 19]: "Bot uses only HTTP interactions and is shown in the online member list"
}
export const FEATURES = {
    "ANIMATED_ICON": "guild has access to set an animated guild icon",
    "BANNER": "guild has access to set a guild banner image",
    "COMMERCE": "guild has access to use commerce features (i.e. create store channels)",
    "COMMUNITY": "guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates",
    "DISCOVERABLE": "guild is able to be discovered in the directory",
    "FEATURABLE": "guild is able to be featured in the directory",
    "INVITE_SPLASH": "guild has access to set an invite splash background",
    "MEMBER_VERIFICATION_GATE_ENABLED": "guild has enabled Membership Screening",
    "MONETIZATION_ENABLED": "guild has enabled monetization",
    "MORE_STICKERS": "guild has increased custom sticker slots",
    "NEWS": "guild has access to create news channels",
    "PARTNERED": "guild is partnered",
    "PREVIEW_ENABLED": "guild can be previewed before joining via Membership Screening or the directory",
    "PRIVATE_THREADS": "guild has access to create private threads",
    "ROLE_ICONS": "guild is able to set role icons",
    "SEVEN_DAY_THREAD_ARCHIVE": "guild has access to the seven day archive time for threads",
    "THREE_DAY_THREAD_ARCHIVE": "guild has access to the three day archive time for threads",
    "TICKETED_EVENTS_ENABLED": "guild has enabled ticketed events",
    "VANITY_URL": "guild has access to set a vanity URL",
    "VERIFIED": "guild is verified",
    "VIP_REGIONS": "guild has access to set 384kbps bitrate in voice (previously VIP voice servers)",
    "WELCOME_SCREEN_ENABLED": "guild has enabled the welcome screen",
}
export const PERMISSIONS = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_GUILD_EXPRESSIONS",
    "USE_APPLICATION_COMMANDS",
    "REQUEST_TO_SPEAK",
    "MANAGE_EVENTS",
    "MANAGE_THREADS",
    "CREATE_PUBLIC_THREADS",
    "CREATE_PRIVATE_THREADS",
    "USE_EXTERNAL_STICKERS",
    "SEND_MESSAGES_IN_THREADS",
    "USE_EMBEDDED_ACTIVITIES",
    "MODERATE_MEMBERS",
    "VIEW_CREATOR_MONETIZATION_ANALYTICS",
    "USE_SOUNDBOARD",
    "Unknown (43)",
    "Unknown (44)",
    "Unknown (45)",
    "SEND_VOICE_MESSAGES"
]