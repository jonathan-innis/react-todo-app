const None = 0;
const Low = 1;
const Medium = 2;
const High = 3;

const LowStr = "low";
const MediumStr = "medium";
const HighStr = "high";

function parsePriority(priority) {
    switch (priority) {
        case LowStr:
            return Low;
        case MediumStr:
            return Medium;
        case HighStr:
            return High;
        default:
            return None;
    }
}

export { parsePriority }