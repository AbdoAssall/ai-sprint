import { createAsyncThunk } from "@reduxjs/toolkit";
import * as invitationService from "../../services/invitationService";
import type { FormInvitationDetails } from "../../types/invitation.types";

export const inviteTeamMember = createAsyncThunk(
  "user/invite",
  async (inviteData: FormInvitationDetails, { rejectWithValue }) => {
    try {
      const { status, data, message } =
        await invitationService.invite(inviteData);

      if (status !== "success") {
        // Check console log Here
        console.log(status);
        return rejectWithValue(message || "Invitation is failed");
      }
      return data;
    } catch (error: any) {
      // Check console log Here
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong while inviting team member",
      );
    }
  },
);
