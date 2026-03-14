# Schemas Reference

JSON schemas for all data files used by the skill-creator skill.

---

## evals.json

Stores the test cases for a skill.

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 0,
      "prompt": "The user's task prompt",
      "expected_output": "Description of what a good output looks like",
      "files": ["path/to/input-file.csv"],
      "assertions": [
        {
          "id": "assert-0",
          "text": "The output contains a header row",
          "type": "presence"
        },
        {
          "id": "assert-1",
          "text": "All monetary values are formatted with 2 decimal places",
          "type": "format"
        }
      ]
    }
  ]
}
```

**Fields:**

- `skill_name`: The name of the skill being tested
- `evals[].id`: Numeric ID, zero-indexed
- `evals[].prompt`: The exact prompt to pass to Claude
- `evals[].expected_output`: Human-readable description of success (not used programmatically)
- `evals[].files`: Optional list of input file paths
- `evals[].assertions`: List of assertions to evaluate. The `assertions` field is optional when first creating test cases — add it once you've drafted assertions.

**Assertion types** (informal, for documentation only — not validated):

- `presence`: Output contains something
- `absence`: Output does not contain something
- `format`: Output follows a formatting rule
- `count`: Output contains exactly N items
- `quality`: Subjective quality assertion

---

## grading.json

Output of the grader agent. Saved per run directory.

```json
{
  "expectations": [
    {
      "text": "The output contains a header row",
      "passed": true,
      "evidence": "Line 1 of output.csv reads 'Name,Date,Amount,Category' — all expected columns present"
    },
    {
      "text": "All monetary values are formatted with 2 decimal places",
      "passed": false,
      "evidence": "Row 7 contains '42.5' instead of '42.50'. Rows 1-6 and 8-12 are correctly formatted."
    }
  ]
}
```

**Important**: Field names must be exactly `text`, `passed`, and `evidence`. The eval viewer depends on these exact names.

---

## timing.json

Captured from subagent task completion notifications. Saved per run directory.

```json
{
  "total_tokens": 84852,
  "duration_ms": 23332,
  "total_duration_seconds": 23.3
}
```

---

## benchmark.json

Aggregated results across all test cases and configurations. Produced by `scripts/aggregate_benchmark`.

```json
{
  "skill_name": "example-skill",
  "iteration": 1,
  "configurations": [
    {
      "name": "with_skill",
      "display_name": "With Skill",
      "evals": [
        {
          "eval_id": 0,
          "eval_name": "extract-line-items",
          "pass_rate": 0.9,
          "assertions_passed": 9,
          "assertions_total": 10,
          "duration_seconds": 23.3,
          "total_tokens": 84852
        }
      ],
      "summary": {
        "pass_rate_mean": 0.9,
        "pass_rate_stddev": 0.05,
        "duration_mean": 23.3,
        "duration_stddev": 2.1,
        "tokens_mean": 84852,
        "tokens_stddev": 3200
      }
    },
    {
      "name": "without_skill",
      "display_name": "Baseline (No Skill)",
      "evals": [...],
      "summary": {...}
    }
  ],
  "delta": {
    "pass_rate": 0.15,
    "duration_seconds": 5.2,
    "total_tokens": 12000
  },
  "analyst_notes": [
    "Assertion 'output contains header row' passes at 100% for both configurations — not discriminating"
  ]
}
```

**Notes:**

- `configurations` should list the with-skill version before its baseline counterpart
- `delta` shows the difference: with_skill minus baseline (positive = skill is better/more)
- `analyst_notes` is populated by the analyzer agent after reviewing the results

---

## comparison.json

Output of the comparator agent for blind A/B comparisons.

```json
{
  "winner": "A",
  "confidence": "high",
  "reasoning": "Output A correctly extracted all 12 line items...",
  "criteria_scores": {
    "completeness": { "A": 10, "B": 7, "notes": "A got all items, B missed 3" },
    "formatting": {
      "A": 9,
      "B": 6,
      "notes": "A consistent, B had date format issues"
    }
  },
  "tie": false
}
```

---

## analysis.json

Output of the post-hoc analyzer after a blind comparison.

```json
{
  "winner": "A",
  "skill_changes_that_mattered": [
    "Added instruction to validate row count against source",
    "Added example of correct date formatting"
  ],
  "why_they_mattered": "The row count validation caught 3 missing items that the baseline missed. The date format example eliminated ambiguity that caused inconsistent formatting.",
  "generalizable_lesson": "Explicit examples are more effective than abstract rules for formatting requirements. Validation steps that check completeness catch errors that quality descriptions miss."
}
```

---

## history.json

Tracks description optimization across iterations. Written and read by `scripts/run_loop.py`.

```json
{
  "skill_name": "example-skill",
  "iterations": [
    {
      "iteration": 0,
      "description": "Original description text",
      "train_score": 0.72,
      "test_score": 0.68,
      "failed_queries": [
        "query that didn't trigger",
        "query that falsely triggered"
      ]
    },
    {
      "iteration": 1,
      "description": "Improved description text",
      "train_score": 0.85,
      "test_score": 0.81,
      "failed_queries": ["one remaining edge case"]
    }
  ],
  "best_description": "The description with the highest test score",
  "best_test_score": 0.81
}
```

---

## metrics.json

Per-query results from description optimization runs. Written by `scripts/run_eval.py`.

```json
{
  "description": "The description being tested",
  "queries": [
    {
      "query": "the user prompt",
      "should_trigger": true,
      "triggered": true,
      "correct": true,
      "runs": [true, true, true]
    },
    {
      "query": "an unrelated prompt",
      "should_trigger": false,
      "triggered": false,
      "correct": true,
      "runs": [false, false, false]
    }
  ],
  "summary": {
    "total": 20,
    "correct": 17,
    "score": 0.85,
    "true_positives": 9,
    "false_negatives": 1,
    "true_negatives": 8,
    "false_positives": 2
  }
}
```
