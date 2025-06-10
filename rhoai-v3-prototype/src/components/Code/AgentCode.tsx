import React from 'react';
import { Box, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const codeSections = {
    'User Input': `from langgraph.graph import StateGraph, END
from typing import TypedDict

# Define the state for our graph, which is passed between nodes
class AgentState(TypedDict):
    user_input: str
    plan: str
    tool_output: str
    final_output: str`,
    'Planner Agent': `# Node 1: Planner Agent (Corresponds to 'Planner Agent' on graph)
def planner_agent(state: AgentState) -> dict:
    """Takes user input and creates a plan."""
    print("---PLANNER AGENT---")
    user_input = state['user_input']
    plan = f"Plan to find information about '{user_input}'"
    print(f"Generated Plan: {plan}")
    return {"plan": plan}`,
    'Tool Agent': `# Node 2: Tool Agent (Corresponds to 'Tool Agent' on graph)
def tool_agent(state: AgentState) -> dict:
    """Executes a tool based on the plan."""
    print("---TOOL AGENT---")
    plan = state['plan']
    tool_output = "The weather is 75 degrees and sunny."
    print(f"Tool Output: {tool_output}")
    return {"tool_output": tool_output}`,
    'Final Output': `# Node 3: Final Output Generator (Corresponds to 'Final Output' on graph)
def final_output_generator(state: AgentState) -> dict:
    """Generates a user-facing response from the tool output."""
    print("---FINAL OUTPUT---")
    tool_output = state['tool_output']
    final_output = f"Based on my tools, here is the result: {tool_output}"
    print(f"Final Response: {final_output}")
    return {"final_output": final_output}`,
    'Workflow': `# Define the graph workflow
workflow = StateGraph(AgentState)
# Add the nodes. The 'User Input' on the graph represents the initial state.
workflow.add_node("planner", planner_agent)
workflow.add_node("tool", tool_agent)
workflow.add_node("output_generator", final_output_generator)
# Set the entry point of the graph
workflow.set_entry_point("planner")
# Add edges to define the flow of execution
workflow.add_edge("planner", "tool")
workflow.add_edge("tool", "output_generator")
workflow.add_edge("output_generator", END)
# Compile the graph into a runnable app
app = workflow.compile()
# Example Invocation:
# app.invoke({"user_input": "What's the weather in San Francisco?"})`,
};

const allCode = Object.values(codeSections).join('\n\n');

interface AgentCodeProps {
  hoveredNode: string | null;
  onNodeEnter: (label: string) => void;
  onNodeLeave: () => void;
}

const CodeSection: React.FC<{ 
    code: string; 
    isHighlighted: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}> = ({ code, isHighlighted, onMouseEnter, onMouseLeave }) => (
    <Box
        component="span"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        sx={{
            display: 'block',
            transition: 'background-color 0.2s ease-in-out',
            backgroundColor: isHighlighted ? 'rgba(255, 235, 59, 0.4)' : 'transparent',
            borderRadius: 1,
            p: 0.5,
            m: -0.5,
            cursor: 'pointer',
        }}
    >
        {code}
    </Box>
);

export const AgentCode: React.FC<AgentCodeProps> = ({ hoveredNode, onNodeEnter, onNodeLeave }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(allCode);
    };

    return (
        <Paper 
            variant="outlined" 
            sx={{ 
                p: 2, 
                bgcolor: '#f5f5f5', 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <CodeIcon sx={{ mr: 1 }} />
                    agent.py
                </Typography>
                <Tooltip title="Copy code">
                    <IconButton onClick={handleCopy} size="small">
                        <ContentCopyIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Paper 
                component="pre" 
                elevation={0} 
                sx={{ 
                    m: 0,
                    p: 2,
                    bgcolor: 'white',
                    overflowX: 'auto',
                    flexGrow: 1,
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    borderRadius: 1,
                    border: '1px solid #e0e0e0'
                }}
            >
                <code>
                    <CodeSection 
                        code={codeSections['User Input']} 
                        isHighlighted={hoveredNode === 'User Input'}
                        onMouseEnter={() => onNodeEnter('User Input')}
                        onMouseLeave={onNodeLeave} 
                    />
                    <br />
                    <CodeSection 
                        code={codeSections['Planner Agent']} 
                        isHighlighted={hoveredNode === 'Planner Agent'}
                        onMouseEnter={() => onNodeEnter('Planner Agent')}
                        onMouseLeave={onNodeLeave} 
                    />
                    <br />
                    <CodeSection 
                        code={codeSections['Tool Agent']} 
                        isHighlighted={hoveredNode === 'Tool Agent'}
                        onMouseEnter={() => onNodeEnter('Tool Agent')}
                        onMouseLeave={onNodeLeave} 
                    />
                    <br />
                    <CodeSection 
                        code={codeSections['Final Output']} 
                        isHighlighted={hoveredNode === 'Final Output'}
                        onMouseEnter={() => onNodeEnter('Final Output')}
                        onMouseLeave={onNodeLeave} 
                    />
                    <br />
                    <CodeSection 
                        code={codeSections['Workflow']} 
                        isHighlighted={false}
                        onMouseEnter={() => {}}
                        onMouseLeave={() => {}}
                    />
                </code>
            </Paper>
        </Paper>
    );
}; 