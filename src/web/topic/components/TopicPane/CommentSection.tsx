import { ChatBubble } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

import { CommentParentType } from "../../../../common/comment";
import { Draft } from "../../../comment/components/Draft";
import { Thread } from "../../../comment/components/Thread";
import { useRootComments } from "../../../comment/store/commentStore";
import { useDraft } from "../../../comment/store/draftStore";
import { useSessionUser } from "../../../common/hooks";
import { useShowResolvedComments } from "../../../view/miscTopicConfigStore";
import { playgroundUsername } from "../../store/store";
import { useOnPlayground } from "../../store/topicHooks";

interface Props {
  parentId: string | null;
  parentType: CommentParentType;
}

export const CommentSection = ({ parentId, parentType }: Props) => {
  const { sessionUser } = useSessionUser();
  const onPlayground = useOnPlayground();
  const myUsername = onPlayground ? playgroundUsername : sessionUser?.username;

  const showResolved = useShowResolvedComments();
  const rootComments = useRootComments(parentId, parentType, showResolved);
  const rootDraft = useDraft(parentId, parentType);

  return (
    <>
      <ListItem disablePadding={false}>
        <ListItemIcon>
          <ChatBubble />
        </ListItemIcon>
        <ListItemText primary="Comments" />
      </ListItem>

      <ListItem disablePadding={false}>
        <div className="w-full space-y-2 text-wrap text-sm">
          {rootComments.map((comment) => (
            <Thread key={comment.id} myUsername={myUsername} rootComment={comment} />
          ))}

          {rootComments.length === 0 && <p className="text-center">No comments yet!</p>}

          {myUsername && (
            <Draft
              authorName={myUsername}
              parentId={parentId}
              parentType={parentType}
              startingText={rootDraft?.content}
            />
          )}
        </div>
      </ListItem>
    </>
  );
};
